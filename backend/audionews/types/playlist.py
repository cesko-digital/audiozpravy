import datetime

from django.db.models.query import QuerySet
from graphene import Field, Int, List, NonNull, Date, String
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise

from recommender.recommend import recommend_by_google_trends
from ..models import Article, Listener, Play, Provider, Playlist, Category
from .play import PlayNode
from .category import CategoryNode
from .article import ArticleNode


class PlaylistNode(DjangoObjectType):
    articles = List(NonNull(ArticleNode), required=True)
    articles_for_category = List(NonNull(ArticleNode), for_date=Date, category_name=String)
    category = NonNull(CategoryNode)

    class Meta:
        model = Playlist
        interfaces = (Node,)
        filter_fields = {
            "type": ["exact"],
            "prepared_for_date": ["gte", "lte"],
        }

    def resolve_articles(root, info, **kwargs):
        return Playlist.objects.get(id=root.id).articles.all()

    def resolve_category(root, info, **kwargs):
        return Playlist.objects.get(id=root.id).category

    def resolve_articles_for_category(root, info, for_date: Date, category_name: str):
        playlist = Playlist.objects.filter(
            prepared_for_date=for_date,
            category__name=category_name
        )
        return playlist.articles.all()

    def resolve_articles_recommended(self, info, **kwargs):
        """ Recommend articles based on user history"""
        #TODO
        pass


"""

            recommendation_df = recommend_by_google_trends(n_of_recommendations=10)
            for index, row in recommendation_df.iterrows():
                provider, created = Provider.objects.get_or_create(name="Unknown", website_url="unknown")
                category_article, created = Category.objects.get_or_create(name=row.category)
                article, created = Article.objects.get_or_create(
                    category=category_article,
                    title = row.title,
                    perex=row.summary,
                    recording_created_at=datetime.datetime.now(),
                    pub_date=datetime.datetime.fromtimestamp(row.published),
                    url=str(row.link),
                    provider=provider
                )
                playlist.articles.add(article)
            return playlist.articles.all()
            """
