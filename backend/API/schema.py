import logging

from graphene import Field, ObjectType, ResolveInfo, Schema
from graphene_django.debug import DjangoDebug
from graphql_jwt import JSONWebTokenMutation, Verify, Refresh
from audionews.models import Listener
from audionews.types import ListenerNode
from audionews import schema


logger = logging.getLogger(__name__)


class ObtainJSONWebToken(JSONWebTokenMutation):
    listener = Field(ListenerNode, description='Reporter node of the current user.')

    @classmethod
    def resolve(cls, root, info, **kwargs):
        listener = Listener.objects.get(username=info.context.user.username)
        logger.info(f'User logged in as {repr(listener)}.')
        return cls(listener=listener)


class Query(
    schema.Query,
    ObjectType,
):
    debug = Field(DjangoDebug, name='_debug')


class Mutation(
    schema.Mutation,
    ObjectType,
):
    token_auth = ObtainJSONWebToken.Field()
    verify_token = Verify.Field()
    refresh_token = Refresh.Field()


schema = Schema(query=Query, mutation=Mutation)
