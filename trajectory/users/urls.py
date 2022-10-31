from django.urls import path
from users.views import *


urlpatterns = [
    path('login/', UserLogin.as_view(), name='UserLogin'),
    path('registration/', UserRegistration.as_view(), name='UserRegistration'),
    path('reset/', UserResetPassword.as_view(), name='UserResetPassword'),
    path('logout/', UserLogout.as_view(), name='UserLogout'),
    path('profile/', UserProfile.as_view(), name='UserProfile'),
    path('profile/update/', UserProfileUpdate.as_view(), name='UserProfileUpdate'),
    path('teachers/shuvalov/', ShuvalovView.as_view(), name='ShuvalovView')
]



