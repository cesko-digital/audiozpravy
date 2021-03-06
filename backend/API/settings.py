import os
from pathlib import Path

import sentry_sdk
from colorlog import ColoredFormatter
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import ignore_logger




# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

from dotenv import load_dotenv
load_dotenv(os.path.join(BASE_DIR, ".env.prod"))

SILENCED_SYSTEM_CHECKS = ["models.E017"]

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET', 'developmentsecret')


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]
"""
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '20.113.148.155',
                 'django-graphene-starter.herokuapp.com',
                 'django-graphene-starter.jerrynsh.com',
]

ALLOWED_HOSTS.extend(
    filter(
        None,
        os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(','),
    )
)
"""

ENVIRONMENT = os.environ.get('ENVIRONMENT', 'development')

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'django_filters',
    'graphql_auth',
    'graphene_django',
    'audionews',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'ratelimit.middleware.RatelimitMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    'http://20.113.148.155:8000',
    'http://20.113.148.155:5000',
    'http://20.113.148.155',
    'http://localhost:4200',
    'https://localhost:4200',
    'http://127.0.0.1:4200',
    'https://127.0.0.1:4200',
]

CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'API.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'API', 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'API.wsgi.application'


DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('SQL_DATABASE'),
        'USER': os.environ.get('SQL_USER'),
        'PASSWORD': os.environ.get('SQL_PASSWORD'),
        'HOST': os.environ.get('SQL_HOST'),
        'PORT': os.environ.get('SQL_PORT'),

    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Logging
# https://docs.djangoproject.com/en/3.1/topics/logging/
DEBUG_PROPAGATE_EXCEPTIONS = True
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'detailed_string': {
            'format': '%(asctime)-15s [%(name)s] %(levelname)s: %(message)s',
            'datefmt': '%Y-%m-%dT%H:%M:%SZ',
        },
        'colored_formatter': {
            '()': ColoredFormatter,
            'format': '%(asctime)-15s [%(cyan)s%(name)s%(reset)s] %(log_color)s%(levelname)s%(reset)s: %(message)s',
            'datefmt': '%Y-%m-%dT%H:%M:%SZ',
            'log_colors': {
                'DEBUG': 'white',
                'INFO': 'green',
                'WARNING': 'yellow',
                'ERROR': 'bold_red',
                'CRITICAL': 'bold_red',
            },
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'colored_formatter',
            'level': 'DEBUG' if DEBUG else 'INFO',
        },
    },
    'loggers': {
        'django.server': {
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'WARNING',  # Set this to 'DEBUG' to print SQL statements
        },
        'django.utils.autoreload': {
            'level': 'WARNING',  # Always set to 'ERROR" unless required
        },
        'API.schema': {
            'handlers': ['console'],
            'level': 'DEBUG' if DEBUG else 'INFO',
        },
    },
}

ignore_logger('graphql.execution.utils')


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Graphene-Django
# https://docs.graphene-python.org/projects/django/en/latest/
GRAPHENE = {
    'RELAY_CONNECTION_MAX_LIMIT': 5000,
    'SCHEMA': 'API.schema.schema',
    'SCHEMA_OUTPUT': 'schema.graphql',
    'MIDDLEWARE': [
        'graphene_django.debug.DjangoDebugMiddleware',
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

GRAPHQL_JWT = {
    "JWT_ALLOW_ANY_CLASSES": [
        "graphql_auth.mutations.Register",
        "graphql_auth.mutations.VerifyAccount",
        "graphql_auth.mutations.ResendActivationEmail",
        "graphql_auth.mutations.SendPasswordResetEmail",
        "graphql_auth.mutations.PasswordReset",
        "graphql_auth.mutations.ObtainJSONWebToken",
        "graphql_auth.mutations.VerifyToken",
        "graphql_auth.mutations.RefreshToken",
        "graphql_auth.mutations.RevokeToken",
        "graphql_auth.mutations.VerifySecondaryEmail",
    ],
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_LONG_RUNNING_REFRESH_TOKEN": True,
}

# Django GraphQL JWT
# https://django-graphql-jwt.domake.io/en/latest/
AUTHENTICATION_BACKENDS = [
    'graphql_auth.backends.GraphQLAuthBackend',
    'django.contrib.auth.backends.ModelBackend',
]
#'graphql_jwt.backends.JSONWebTokenBackend',

# Django Rate Limit
# https://django-ratelimit.readthedocs.io/en/stable/
RATELIMIT_VIEW = 'API.views.ratelimited_error'
RATELIMIT_RATE = os.environ.get('RATELIMIT_RATE', '5/s')


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATIC_URL = '/static/'


