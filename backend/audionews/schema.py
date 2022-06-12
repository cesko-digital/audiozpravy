from graphene import ObjectType
from graphene.relay import Node
from graphene import Field, Int, List, String
from graphene_django.filter import DjangoFilterConnectionField
from datetime import datetime
import graphql_jwt

from .mutations import RegisterListener, PlayArticle
from .types import ArticleNode, ListenerNode, PlayNode, ProviderNode, PlaylistNode, CategoryNode
from .models import Article, Listener, Play, Provider, Playlist, Category


class Mutation(ObjectType):
    register_listener = RegisterListener.Field(description='Create a single listener.')
    play_article = PlayArticle.Field(description='Record a play of an article.')

class Query(ObjectType):
    me = Field(ListenerNode)
    article = Node.Field(ArticleNode, description='Retrieve a single article node.')
    articles = DjangoFilterConnectionField(ArticleNode, description='Return list of articles.')
    my_articles = DjangoFilterConnectionField(ArticleNode, description='Return list of my unheard articles.')
    categories = List(CategoryNode, description="Return list of articles.")
    listener = Node.Field(ListenerNode, description='Retrieve a single listener node.')
    listeners = DjangoFilterConnectionField(ListenerNode, description='Return list of listeners.')
    providers = List(ProviderNode, description='Return list of providers.')
    playlists = DjangoFilterConnectionField(PlaylistNode, description='Return list of playlists.')
    playlists_for_today = List(PlaylistNode, required=True)
    playlists_for_this_week = List(PlaylistNode, required=True)


    def resolve_me(root, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Please login!')
        return user

    def resolve_my_articles(root, info, **kwargs):
        return Article.objects.exclude(plays__listener__username=info.context.user.username).all()

    def resolve_articles(root, info, **kwargs):
        return Article.objects.all()

    def resolve_providers(root, info):
        return Provider.objects.all()

    def resolve_categories(root, info):
        return Category.objects.all()

    def resolve_listeners(root, info, **kwargs):
        return Listener.objects.all()

    def resolve_playlists(root, info, **kwargs):
        return Playlist.objects.all()

    def resolve_playlists_for_today(root, info):
        return Playlist.objects.filter(type="Day").all().filter(prepared_for_date=datetime.today())

    def resolve_playlists_for_this_week(root, info):
        return Playlist.objects.filter(type="Week").all()
