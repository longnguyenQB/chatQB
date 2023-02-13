from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenObtainPairPatchedSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(TokenObtainPairPatchedSerializer, self).validate(attrs)

        return data
        # Custom data you want to include
        # data.update({'organization': self.user.organization.uid})
        # and everything else you want to send in the response