"""
BridgeGuard ML - Dataset Audit and Provenance Module
Phase 2: Real Road-Bridge Dataset Investigation and Verification Report
"""

DATASET_AUDIT = {
    "investigated_leads": [
        {
            "id": "LEAD_CAUVERY_01",
            "name": "Cauvery Bridge Vibration Monitoring",
            "location": "Tiruchirappalli, Tamil Nadu, India",
            "bridge_type": "Multi-Span Road Bridge",
            "institution": "National Institute of Technology Tiruchirappalli (NIT Trichy)",
            "reference_url": "https://doi.org/10.1080/10168664.2025.2544271",
            "doi": "10.1080/10168664.2025.2544271",
            "citation": "Anjuna, S., Radhakrishnan, N., & George, G. (2025). Establishment of a Real-time Vibration Monitoring System on Cauvery Bridge in India. Structural Engineering International.",
            "sensors": "Triaxial accelerometers, LabVIEW DAQ",
            "sampling_frequency_hz": "Varies / Real-time telemetry",
            "road_bridge": True,
            "real_observations": True,
            "raw_data_accessible": False,
            "verification_status": "AUDITED_RESTRICTED_ACCESS",
            "audit_notes": (
                "Verified via Taylor & Francis Online. The research paper describes FE modeling and triaxial accelerometer "
                "sensor deployment on the Cauvery Road Bridge in Tiruchirappalli. However, the raw measurement data files "
                "are NOT publicly hosted on open repositories (Zenodo, Mendeley, Dryad). Access requires private author request."
            )
        },
        {
            "id": "LEAD_AMARAVATHI_02",
            "name": "Amaravathi Highway Bridge Dynamic Testing",
            "location": "Across Amaravathi River, Tamil Nadu, India",
            "bridge_type": "Prestressed Concrete Highway Bridge",
            "institution": "CSIR - Structural Engineering Research Centre (CSIR-SERC), Chennai",
            "reference_url": "https://serc.res.in/vibration-testing-highway-bridge-structure",
            "doi": None,
            "citation": "CSIR-SERC (2026). Vibration testing of highway bridge structure across Amaravathi river. Institutional Project Report.",
            "sensors": "8 vertical accelerometers, 2 electrodynamic shakers (MIMO mode)",
            "sampling_frequency_hz": "Bandwidth covering natural frequency of 5.28 Hz",
            "road_bridge": True,
            "real_observations": True,
            "raw_data_accessible": False,
            "verification_status": "AUDITED_PROJECT_SUMMARY_ONLY",
            "audit_notes": (
                "Verified via official CSIR-SERC portal. Ambient and forced vibration testing conducted across Amaravathi river highway span. "
                "The web page is an institutional research summary. Raw time-series signal files are not hosted for open public download."
            )
        },
        {
            "id": "LEAD_CRRI_03",
            "name": "CSIR-CRRI Bridge Engineering & Structures Testing",
            "location": "New Delhi / National Highways, India",
            "bridge_type": "Various Highway Road Bridges",
            "institution": "CSIR - Central Road Research Institute (CSIR-CRRI)",
            "reference_url": "https://crridom.gov.in",
            "doi": None,
            "citation": "CSIR-CRRI Bridge Engineering and Structures Division Field Testing Protocols.",
            "sensors": "Structural accelerometers and deflection gauges",
            "sampling_frequency_hz": "Project-specific",
            "road_bridge": True,
            "real_observations": True,
            "raw_data_accessible": False,
            "verification_status": "AUDITED_CONSULTANCY_RESTRICTED",
            "audit_notes": (
                "Verified CSIR-CRRI protocols. Bridge testing data is collected as commissioned / sponsored governmental consultancy "
                "for national highway authorities and is confidential / not published as open-access telemetry."
            )
        }
    ],
    "verified_active_dataset": {
        "id": "DS_PONNERI_IIT_MADRAS",
        "name": "Ponneri Bridge Vibration Dataset",
        "location": "Ponneri, Tamil Nadu, India",
        "bridge_type": "Steel Truss Bridge",
        "institution": "Indian Institute of Technology Madras (IIT Madras)",
        "reference_url": "https://data.mendeley.com/datasets/hh52mhtndg/2",
        "doi": "10.17632/hh52mhtndg.2",
        "citation": "Raphael, B. (2021). Vibration data - Ponneri Bridge - Local Train 8 am. Mendeley Data, V2, doi: 10.17632/hh52mhtndg.2.",
        "sensors": "3 multi-axial accelerometers (8 active acceleration channels: A1-A4, B1-B4)",
        "channels": [
            "A1_Acc_1_Y", "A2_Acc_1_x", "A3_Acc_1_Z", "A4_Acc2_Y",
            "B1_Acc_2_X", "B2_Acc_2_Z", "B3_Acc_3_Y", "B4_Acc3_X"
        ],
        "physical_units": "Acceleration (g / normalized voltage response)",
        "sampling_frequency_hz": 600.0,
        "sample_count": 31978,
        "duration_seconds": 53.3,
        "road_bridge": False,
        "structure_class": "Steel Truss Bridge Structure",
        "real_observations": True,
        "raw_data_accessible": True,
        "raw_file_obtained": "ml/data/Vibration data - Ponneri Bridge - Local Train 8 am/8 am local train.XLSX",
        "raw_file_size_bytes": 4374658,
        "verification_status": "VERIFIED_ACTIVE_REAL_DATA",
        "operational_states": {
            "ambient_baseline": "Windows 0 to 20 (ambient structural vibrations, train approaching)",
            "dynamic_event": "Windows 27 to 37 (intense dynamic loading during passage, >100x acceleration jump)"
        },
        "audit_notes": (
            "Verified and extracted locally. Only accessible open-access real bridge vibration dataset from Tamil Nadu, India. "
            "Serves as the empirical anchor for baseline vibration dynamics, multi-model evaluation, and Gaussian parameter estimation."
        )
    },
    "verified_road_bridge_benchmarks": [
        {
            "id": "BENCH_ROUTE345_NY",
            "name": "Route 345 Bridge over Big Sucker Brook",
            "location": "Waddington, St. Lawrence County, New York, USA",
            "bridge_type": "Steel Stringer Highway Road Bridge",
            "institution": "Clarkson University / New York State DOT",
            "reference_url": "https://doi.org/10.5281/zenodo.13737790",
            "doi": "10.5281/zenodo.13737790",
            "citation": "Whelan, M. J. et al. (2024). Data set from ambient vibration monitoring and static loading of a steel stringer bridge subject to imposed damage. Zenodo.",
            "sensors": "Dual-axis accelerometers and strain transducers",
            "sampling_frequency_hz": 200.0,
            "road_bridge": True,
            "real_observations": True,
            "raw_data_accessible": True,
            "format": "HDF5 (Rt345Bridge.h5)",
            "damage_labels": True,
            "audit_notes": "Real two-lane highway road bridge under vehicle passes and static truck loading with imposed mechanical cuts."
        },
        {
            "id": "BENCH_VANERSBORG_SE",
            "name": "Vänersborg Bridge Structural Health Monitoring",
            "location": "Vänersborg, Sweden",
            "bridge_type": "Steel Bascule / Road Bridge",
            "institution": "KTH Royal Institute of Technology",
            "reference_url": "https://doi.org/10.5281/zenodo.8300495",
            "doi": "10.5281/zenodo.8300495",
            "citation": "Vänersborg Bridge SHM Dataset, Zenodo, DOI: 10.5281/zenodo.8300495.",
            "sensors": "Accelerometers, inclinometers, strain gauges, weather sensors",
            "road_bridge": True,
            "real_observations": True,
            "raw_data_accessible": True,
            "damage_labels": True,
            "audit_notes": "Real road-bridge structure monitored before, during, and after an authentic structural fatigue fracture."
        }
    ]
}

def get_audit_summary():
    return DATASET_AUDIT

if __name__ == "__main__":
    import json
    print(json.dumps(DATASET_AUDIT, indent=2))
