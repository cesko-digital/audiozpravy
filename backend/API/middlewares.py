from graphene import ResolveInfo
from sentry_sdk import capture_exception
from audionews.types import ArticleNode


class SentryMiddleware(object):
    """
    Properly capture errors during query execution and send them to Sentry
    Then raise the error again and let Graphene handle it
    """

    def on_error(self, error):
        capture_exception(error)
        raise error

    def resolve(self, next, root, info: ResolveInfo, **args):
        """
        This will run on every single GraphQL field.

        You can think of each field in a GraphQL query as a function or method of the previous type which returns the next type.
        In fact, this is exactly how GraphQL works.
        Each field on each type is backed by a function called the resolver which is provided by the GraphQL server developer.
        When a field is executed, the corresponding resolver is called to produce the next value.

        Reference: https://graphql.org/learn/execution/
        """
        return next(root, info, **args).catch(self.on_error)

