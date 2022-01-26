import logging

from graphene import Field, ObjectType, ResolveInfo, Schema
from graphene_django.debug import DjangoDebug
from graphql_jwt import JSONWebTokenMutation, Verify, Refresh
from audionews.models import Listener
from audionews.types import ListenerNode
from audionews import schema
from graphql_auth import mutations
from graphql_auth.schema import MeQuery

logger = logging.getLogger(__name__)


class ObtainJSONWebToken(JSONWebTokenMutation):
    listener = Field(ListenerNode, description='Listener node of the current user.')

    @classmethod
    def resolve(cls, root, info, **kwargs):
        listener = Listener.objects.get(username=info.context.user.username).first()
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
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()


#https://django-graphql-auth.readthedocs.io/en/latest/installation/


schema = Schema(query=Query, mutation=Mutation)
