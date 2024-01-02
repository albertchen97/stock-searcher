# Getting Started

## 1. Create an environment

```bash
python3 -m venv .venv
```

*If python3 is not a recognizable command, try:*

```bash
python -m venv .venv
```

## 2. Activate the environment

MacOS/Linux:

```bash
. .venv/bin/activate
```

<!-- Windows:

```bash
.venv\Scripts\activate
``` -->

## 3. Install Dependencies (including Flask)

```bash
pip install -r requirements.txt
```

## 4. Run the Flask app

```bash
flask --app application run
```
