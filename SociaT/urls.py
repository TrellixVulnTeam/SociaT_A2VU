"""SociaT URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from tweets.views import (
    home_page,
    tweet_details_view,
    tweet_list_view,
    tweet_create_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_page),
    path('react/', TemplateView.as_view(template_name='react_via_dj.html')),
    path('tweet/<int:tweet_id>', tweet_details_view),
    path('tweets/', tweet_list_view),
    path('create-tweet/', tweet_create_view),
    path('api/tweet/', include('tweets.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)