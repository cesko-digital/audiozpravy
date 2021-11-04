from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise
from ..models import Article, Play
from .article import ArticleNode


class PlayNode(DjangoObjectType):
    article = NonNull(ArticleNode)

    class Meta:
        model = Play
        interfaces = (Node,)

    def resolve_article(root, info, **kwargs):
        return Play.objects.get(id=root.id).article

