# Getting Started

## 1. Create an Virtual Environment for Flask

```bash
python3 -m venv .venv
```

*The ```-m``` flag tells Python to run a module as a script.*

<!-- *If python3 is not a recognizable command, try:*

```bash
Python -m venv .venv
``` -->

## 2. Activate the Virtual Environment

MacOS/Linux:

```bash
. .venv/bin/activate
```

*In case you want to deactivate: `. deactivate`*

<!-- Windows:

```bash
.venv\Scripts\activate
``` -->

## 3. Install Dependencies (including Flask)

```bash
pip install -r requirements.txt
```

## 4. Run the Flask App

```bash
flask --app application run
```
