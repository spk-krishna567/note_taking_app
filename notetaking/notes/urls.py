 
from django.urls import path
from notes import views 
 
urlpatterns = [ 
    path('api/notes', views.note_list),
    path('api/notes/<int:id>/', views.note_detail),
]