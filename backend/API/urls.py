from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from API.views import HelloView, RateLimitedGraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(RateLimitedGraphQLView.as_view(graphiql=True))),
    path('hello/', HelloView.as_view()),
]


handler404 = 'API.views.custom_page_not_found_view'
