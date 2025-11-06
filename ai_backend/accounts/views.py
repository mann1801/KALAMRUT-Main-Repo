from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model, authenticate
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status

User = get_user_model()  # CustomUser is returned if AUTH_USER_MODEL is set

@api_view(['POST'])
def signup_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Please provide username, password, and email.'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'}, status=400)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User created successfully'}, status=201)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'Please provide username, email, and password.'}, status=400)

    # First try to authenticate with username
    user = authenticate(username=username, password=password)

    # If authentication fails, check if the email matches a user
    if user is None:
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            pass

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'email': user.email
        })
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Optional: use this if you want to customize the token payload
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_profile_view(request):
    """
    Update user profile information (username and/or email)
    """
    user = request.user
    data = request.data
    
    # Check if username is being updated and validate
    if 'username' in data:
        new_username = data['username'].strip()
        if not new_username:
            return Response(
                {'error': 'Username cannot be empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if User.objects.filter(username=new_username).exclude(pk=user.pk).exists():
            return Response(
                {'error': 'Username is already taken'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user.username = new_username
    
    # Check if email is being updated and validate
    if 'email' in data:
        new_email = data['email'].strip()
        if not new_email:
            return Response(
                {'error': 'Email cannot be empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if User.objects.filter(email=new_email).exclude(pk=user.pk).exists():
            return Response(
                {'error': 'Email is already registered'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        user.email = new_email
    
    # Check if password is being updated (optional)
    if 'password' in data and data['password']:
        user.set_password(data['password'])
    
    try:
        user.save()
        return Response({
            'message': 'Profile updated successfully',
            'username': user.username,
            'email': user.email
        })
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
