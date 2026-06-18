---
layout: post
title: "Mapping Campus Expression for Heterodox Academy"
type: portfolio
category: Data Analysis
tags: [Data Analysis, Python, Cartopy]
slug: heterodox-academy-campus-expression-map
authors: Kevin Price
image: /images/HxA-reluctance-map.png
---

I recently helped Payton Jones, an analyst at [Heterodox Academy](https://heterodoxacademy.org), build a data visualization for one of their reports: ["The Universal Problem of Campus Expression"](https://heterodoxacademy.org/reports/the-universal-problem-of-campus-expression/). The map appears on page 12 of the report and shows how reluctant college students are to discuss controversial topics — and, perhaps more importantly, *where* that reluctance is or isn't concentrated geographically.
<!--end_summary-->

### The Question

Heterodox Academy runs the Campus Expression Survey, asking students nationwide about their comfort discussing topics like politics, religion, race, and gender in class. Payton had survey responses tied to specific universities across the country and wanted to know: **does students' reluctance to discuss controversial topics vary by region?** Is the Northeast different from the South? Is it a coastal/inland divide, a red state/blue state divide, or something else entirely?

The data came from a series of nationwide campus surveys, with each response geocoded to the latitude and longitude of the responding student's university and scored on a standardized `reluctance_score` — a composite built from four discomfort items (politics, race, religion, and gender) with a mean of 0 and a standard deviation of 1.

### Why Mapping Is Harder Than It Looks

My job was to turn point-level survey data — single coordinates pinned to individual universities — into something that visually communicated regional patterns, using Python's [cartopy](https://scitools.org.uk/cartopy/) library. That sounds straightforward, but it isn't: you only have *data at universities*, not data everywhere, and a map invites the eye to read meaning into the empty spaces between those points.

I went through several approaches before landing on the final design.

**1. Interpolation.** My first instinct was to interpolate the reluctance score across the map, shading the entire country based on the values at nearby universities — similar to a weather map. I tried several interpolation methods, but ultimately abandoned this approach. It implies a level of precision the data doesn't have: it doesn't make sense to extrapolate a score over hundreds of miles of countryside based on a handful of pinpoint values at universities. A rural county with no responding university would get a value assigned anyway, manufactured entirely by its distance to the nearest data points.

**2. A weighted scatterplot.** Next, I plotted each university as a single point, sized and colored by its average reluctance score, with point size reflecting the number of responses collected at that location. This was honest about where the data actually came from, but it was visually noisy — campuses cluster densely in some regions and sparsely in others, making it hard to see any regional signal through the clutter of overlapping points.

**3. Hexagonal binning.** I then tried a hexbin plot, aggregating nearby points into hexagonal cells. This smoothed out some of the scatter's visual noise while still respecting that we only have information where universities exist, but the hexagonal grid imposed an arbitrary geometry on the data that didn't map cleanly onto how people actually think about US regions.

**4. 2D grid binning (final).** The version that shipped in the report uses true 2D binning — the country is divided into a grid of small square cells (roughly 0.75° per side), and each cell is shaded by the *mean* reluctance score of the universities that happen to fall inside it. Cells with no universities in them are simply left blank rather than filled in with a guess. This kept the map honest about where the data actually came from while finally making any regional pattern — or lack thereof — legible at a glance.

I built this using [`pyinterp`](https://pangeo-pyinterp.readthedocs.io/)'s `Binning2D` on top of cartopy. This is what the code looks like (trimmed down — Payton may have tweaked details before publication):

```python
import cartopy.feature as cfeature
import cartopy.crs as ccrs
import matplotlib.pyplot as plt
import pyinterp
import numpy as np
import pandas as pd

df = pd.read_csv("map_data.csv")
pointlon, pointlat, score = df["longitude"], df["latitude"], df["reluctance_score"]

# Bin the country into a grid of ~0.75-degree cells
binning = pyinterp.Binning2D(
    pyinterp.Axis(np.arange(-130, -65, 0.75), is_circle=True),
    pyinterp.Axis(np.arange(24, 50, 0.75)))

binning.push(pointlon, pointlat, score, False)
mean_score = binning.variable("mean")  # average reluctance score per cell

extent = [-122, -69, 24, 50.5]
proj = ccrs.AlbersEqualArea(np.mean(extent[:2]), np.mean(extent[2:]))

fig = plt.figure(figsize=(9, 6))
ax = plt.axes(projection=proj)
ax.set_extent(extent, crs=ccrs.PlateCarree())
ax.add_feature(cfeature.STATES, linewidth=0.75, edgecolor="green", alpha=0.5)
ax.coastlines()

lon, lat = np.meshgrid(binning.x, binning.y, indexing="ij")
pcm = ax.pcolormesh(lon, lat, mean_score, cmap="RdYlGn", shading="auto",
                     transform=ccrs.PlateCarree())
fig.colorbar(pcm, ax=ax, label="reluctance score\n(higher = increased reluctance)")
plt.show()
```

### What We Found

![Average student reluctance (z-scores) by geographical location across the United States](/images/HxA-reluctance-map.jpg)
*Figure from the published report.*

After all that iteration, the answer to the original question turned out to be a clean **no** — students' reluctance to discuss controversial topics does not vary meaningfully by geographic region. Wherever a student goes to college, the discomfort discussing politics, race, religion, and gender in class looks remarkably similar. That's arguably a more interesting finding than a regional divide would have been: it suggests the "universal problem" in the report's title is exactly that — universal, not a symptom of any one part of the country.

You can see the final map and read the full analysis in the published report: [**"The Universal Problem of Campus Expression"**](https://heterodoxacademy.org/reports/the-universal-problem-of-campus-expression/) (see the figure on page 12).
