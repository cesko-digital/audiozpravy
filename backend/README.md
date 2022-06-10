# Dockerizing Django with Postgres, Gunicorn, and Nginx

## Want to learn how to build this?

Check out the [post](https://testdriven.io/dockerizing-django-with-postgres-gunicorn-and-nginx).

## Want to use this project?

### Development

Uses the default Django development server.

1. Rename *.env.dev-sample* to *.env.dev*.
1. Update the environment variables in the *docker-compose.yml* and *.env.dev* files.
1. Build the images and run the containers:

    ```sh
    $ docker-compose up -d --build
    ```

    Test it out at [http://localhost:8000](http://localhost:8000). The "app" folder is mounted into the container and your code changes apply automatically.

### Production

Uses gunicorn + nginx.

1. Rename *.env.prod-sample* to *.env.prod* and *.env.prod.db-sample* to *.env.prod.db*. Update the environment variables.
1. Build the images and run the containers:

    ```sh
    $ docker-compose -f docker-compose.prod.yml up -d --build
    ```

    Test it out at [http://localhost:1337](http://localhost:1337). No mounted folders. To apply changes, the image must be re-built.



Successfully installed Cython-0.29.14 Faker-12.0.1 Jinja2-3.1.2 MarkupSafe-2.1.1 aio-pika-6.4.1 aiormq-3.3.1 amqp-5.1.1 aniso8601-7.0.0 asgiref-3.5.1 astroid-2.11.4 attrs-21.4.0 autopep8-1.6.0 billiard-3.6.4.0 cached-property-1.5.2 cachetools-5.0.0 celery-5.1.2 cffi-1.15.0 chardet-3.0.4 click-7.1.2 click-didyoumean-0.3.0 click-plugins-1.1.1 click-repl-0.2.0 colorlog-6.6.0 coverage-6.3.2 cryptography-37.0.1 dawg-python-0.7.2 deeppavlov-0.17.3 dill-0.3.4 dj-database-url-0.5.0 dj-static-0.0.6 django-3.2 django-celery-beat-2.2.1 django-extensions-3.1.5 django-filter-21.1 django-graphql-auth-0.3.16 django-graphql-jwt-0.3.0 django-ratelimit-3.0.1 django-silk-4.3.0 django-timezone-field-4.2.3 dnspython-1.16.0 docopt-0.6.2 eventlet-0.30.2 fastapi-0.47.1 feedparser-6.0.8 filelock-3.0.12 flake8-4.0.1 gensim-4.2.0 gprof2dot-2021.2.21 graphene-2.1.9 graphene-django-2.15.0 graphql-core-2.3.2 graphql-relay-2.0.1 greenlet-1.1.2 gunicorn-20.0.4 h11-0.9.0 h5py-2.10.0 httptools-0.1.2 huggingface-hub-0.5.1 idna-2.8 importlib-metadata-4.2.0 iniconfig-1.1.1 isort-5.10.1 joblib-1.1.0 kombu-5.2.4 lazy-object-proxy-1.7.1 mccabe-0.6.1 mixer-7.2.2 multidict-6.0.2 nltk-3.4.5 numpy-1.18.0 overrides-2.7.0 packaging-21.3 pamqp-2.3.0 pandas-0.25.3 platformdirs-2.5.2 pluggy-1.0.0 prometheus-client-0.7.1 promise-2.3 prompt-toolkit-3.0.29 psycopg2-binary-2.9.3 py-1.11.0 pycodestyle-2.8.0 pycparser-2.21 pydantic-1.3 pyflakes-2.4.0 pyjwt-1.7.1 pylint-2.13.8 pylint-django-2.5.3 pylint-plugin-utils-0.7 pymorphy2-0.8 pymorphy2-dicts-2.4.393442.3710985 pymorphy2-dicts-ru-2.4.417127.4579844 pyopenssl-22.0.0 pyparsing-3.0.8 pytelegrambotapi-3.6.7 pytest-7.1.2 pytest-cov-3.0.0 pytest-django-4.5.2 python-crontab-2.6.0 python-dateutil-2.8.2 pytz-2019.1 pyyaml-6.0 regex-2022.4.24 requests-2.22.0 ruamel.yaml-0.15.100 rusenttokenize-0.0.5 rx-1.6.1 sacremoses-0.0.35 scikit-learn-0.21.2 scipy-1.4.1 sentry-sdk-1.5.8 sgmllib3k-1.0.0 singledispatch-3.7.0 six-1.16.0 smart-open-6.0.0 sqlparse-0.4.2 starlette-0.12.9 static3-0.7.0 text-unidecode-1.3 tokenizers-0.12.1 toml-0.10.2 tomli-2.0.1 tqdm-4.62.0 transformers-4.16.2 typed-ast-1.5.3 typing-extensions-4.2.0 urllib3-1.25.11 uvicorn-0.11.7 uvloop-0.14.0 vine-5.0.0 wcwidth-0.2.5 websockets-8.1 werkzeug-2.1.2 wrapt-1.14.1 yarl-1.7.2 zipp-3.8.0
