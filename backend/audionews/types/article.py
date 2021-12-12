from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull
from graphene.relay import Connection, Node
from django_filters import FilterSet, ModelMultipleChoiceFilter
from graphene_django.filter import GlobalIDFilter, GlobalIDMultipleChoiceFilter
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise
from classes import CategoryEnum
from ..models import Article, Provider, Play, Listener, Category
from .provider import ProviderNode
from .category import CategoryNode





class ArticleFilter(FilterSet):
    category__key__in = ModelMultipleChoiceFilter(
        field_name='category',
        queryset=Category.objects.all()
    )

    class Meta:
        model = Article
        fields = {
            "title": ["exact", "icontains", "istartswith"],
            "perex": ["exact", "icontains", "istartswith"],
            "text": ["icontains", "istartswith"],
            "pub_date": ["gte", "lte"],
            "recording_url": ["isnull"],
            "category__name": ["exact"],
            "category__key": ["in", "exact"],
        }


class ArticleNode(DjangoObjectType):
    provider = NonNull(ProviderNode)
    category = NonNull(CategoryNode)

    class Meta:
        model = Article
        interfaces = (Node,)
        filterset_class = ArticleFilter

    def resolve_provider(root, info, **kwargs):
        return Article.objects.get(id=root.id).provider

    def resolve_category(root, info, **kwargs):
        return Article.objects.get(id=root.id).category


