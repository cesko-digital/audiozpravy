from graphene import ObjectType
from graphene.relay import Node
from graphene import Field, Int, List, String
from graphene_django.filter import DjangoFilterConnectionField
from datetime import datetime
import graphql_jwt

from .mutations import RegisterListener
from .types import ArticleNode, ListenerNode, PlayNode, ProviderNode, PlaylistNode, CategoryNode
from .models import Article, Listener, Play, Provider, Playlist, Category


class Mutation(ObjectType):
    register_listener = RegisterListener.Field(description='Create a single Listener.')
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(ObjectType):
    me = Node.Field(ListenerNode)
    article = Node.Field(ArticleNode, description='Retrieve a single Article node.')
    articles = DjangoFilterConnectionField(ArticleNode, description='Return list of Articles.')
    categories = List(CategoryNode, description="Return list of Articles.")
    listener = Node.Field(ListenerNode, description='Retrieve a single Listener node.')
    listeners = DjangoFilterConnectionField(ListenerNode, description='Return list of Listeners.')
    providers = List(ProviderNode, description='Return list of Providers.')
    playlists = DjangoFilterConnectionField(PlaylistNode, description='Return list of Playlists.')
    playlists_for_today = List(PlaylistNode, required=True)
    playlists_for_this_week = List(PlaylistNode, required=True)

    def resolve_me(root, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Please login!')
        return user

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
        return Playlist.objects.filter(type="Day").all()
        #.filter(prepared_for_date=datetime.today())

    def resolve_playlists_for_this_week(root, info):
        return Playlist.objects.filter(type="Week").all()
