from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise

from ..models import Article, Provider, Play, Listener
from .provider import ProviderNode
from .category import CategoryNode

class ArticleNode(DjangoObjectType):
    provider = NonNull(ProviderNode)
    category = NonNull(CategoryNode)

    class Meta:
        model = Article
        interfaces = (Node,)
        filter_fields = {
            "title": ["exact", "icontains", "istartswith"],
            "perex": ["exact", "icontains", "istartswith"],
            "text": ["icontains", "istartswith"],
            "pub_date": ["gte", "lte"],
            "recording_url": ["isnull"],
            "category__name": ["exact"],
            "category__key": ["exact"],
        }

    def resolve_provider(root, info, **kwargs):
        return Article.objects.get(id=root.id).provider

    def resolve_category(root, info, **kwargs):
        return Article.objects.get(id=root.id).category

