import logging

from graphene import Field, ObjectType, ResolveInfo, Schema
from graphene_django.debug import DjangoDebug
from graphql_jwt import JSONWebTokenMutation, Verify
from audionews.models import Listener
from audionews.types import ListenerNode
from audionews import schema


logger = logging.getLogger(__name__)


class ObtainJSONWebToken(JSONWebTokenMutation):
    reporter = Field(ListenerNode, description='Reporter node of the current user.')

    @classmethod
    def resolve(cls, root, info: ResolveInfo, **kwargs):
        reporter = Listener.objects.get(username=info.context.listener.username)
        logger.info(f'User logged in as {repr(reporter)}.')
        return cls(reporter=reporter)


class Query(
    schema.Query,
    ObjectType,
):
    debug = Field(DjangoDebug, name='_debug')


class Mutation(
    schema.Mutation,
    ObjectType,
):
    token_auth = ObtainJSONWebToken.Field(description='Retrieve the JWT of the user based on user credentials.')
    verify_token = Verify.Field(description='Verify a JWT token.')


schema = Schema(query=Query, mutation=Mutation)
