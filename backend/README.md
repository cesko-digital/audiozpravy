
# Getting Started

## Installing Dependencies

```sh
pipenv sync --dev
```

## How to Use

### Run Development Server Locally

```sh
# Database migration
pipenv run python3 manage.py makemigrations
pipenv run python3 manage.py migrate

#Populate DB
pipenv run python3 populate_db.py

# Run GraphQL server at localhost:8000 by default
pipenv run python3 manage.py runserver

# Run GraphQL server with gunicorn
gunicorn --chdir backend API.wsgi
```

### Run Shell Locally

```sh
pipenv run python3 backend/manage.py shell_plus
```

### List Model Info

```sh
python3 backend/manage.py list_model_info --field-class
```

### Queries and Mutation

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Django%20Graphene%20Starter&uri=https%3A%2F%2Fgist.githubusercontent.com%2Fngshiheng%2F210e746ea69c7b0420e8172893eaa78c%2Fraw%2Fe82e43ecea65018a45741c36b8115d3fd334ff85%2Fgraphene_django_starter.json)

Read more about using Insomnia for API development [here](https://medium.com/swlh/fast-track-your-api-development-with-insomnia-rest-client-d02521c31b9d).

### Generating Fixtures

[mixer](https://github.com/klen/mixer) is used to generate fixtures for this project.

```sh
# To generate fixtures
python3 backend/manage.py generate_fixtures -r 1000 -a 10 -p 10

# To delete all data
python backend/manage.py flush
```


### Running job runner
Job runner requires slavic bert model. To download the model and extract model, run
```
wget -P backend/job_runner/data/ http://files.deeppavlov.ai/deeppavlov_data/bert/bg_cs_pl_ru_cased_L-12_H-768_A-12_pt.tar.gz
tar -xf backend/job_runner/data/bg_cs_pl_ru_cased_L-12_H-768_A-12_pt.tar.gz -C backend/job_runner/data/
```

To run job runner script run
```
CUDA_VISIBLE_DEVICES="" python3 backend/job_runner/main_jobs.py
```
Job runner scrapes latest articles from provided feeds, creates audio for each feed (if Azure audio is provided), creats
vectors for each article and saves them into job_runner/data/articles_embeddings.json file.

Run this script as a cronjob via these commands:

```
crontab -e
```
To edit the crontab file. To run the script each 8 hours, add following line into crontab:

```
0 */8 * * * CUDA_VISIBLE_DEVICES="" python3 backend/job_runner/main_jobs.py
```
