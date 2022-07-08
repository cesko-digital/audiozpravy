from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from API.views import HelloView, RateLimitedGraphQLView
from graphene_django.views import GraphQLView
from django.conf import settings
from django.views.static import serve

from job_runner.scheduler import Scheduler

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('hello/', HelloView.as_view()),
]

# Put the line provided below into your `urlpatterns` list.
url(r'^(?P<path>.*)$', serve, {'document_root': settings.STATIC_ROOT})

handler404 = 'API.views.custom_page_not_found_view'

print("Running scheduler")
scheduler = Scheduler()
scheduler.plan_jobs()
