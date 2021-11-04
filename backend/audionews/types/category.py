from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Article, Category
from .article import ArticleNode


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        interfaces = (Node,)

