# Vänersborg Bridge SHM Dataset

## Metadata
* **Dataset:** Dataset from structural health monitoring of a steel bridge in Sweden
* **Source:** Zenodo
* **DOI:** 10.5281/zenodo.8300495
* **Purpose:** Training and testing structural anomaly detection algorithms.

## Description
This dataset contains real-world structural health monitoring data from the Vänersborg Bridge in Sweden. It includes:
* Acceleration measurements
* Strain measurements
* Inclination / Tilt measurements
* Weather conditions
* 64 verified bridge opening events
* Measurements recorded before, during, and after a verified structural fracture.

## Classification Scheme
For our machine learning pipeline, this dataset is used as a binary classification problem:
* `NORMAL` (Pre-fracture events and baseline measurements)
* `ABNORMAL` (Post-fracture events)

*Note: The raw dataset (approx. 552 MB) is not checked into version control.*
