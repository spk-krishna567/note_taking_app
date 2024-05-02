from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from notes.models import Notes
from notes.serializers import NoteSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def note_list(request):
    if request.method == 'GET':
        notes = Notes.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            notes = notes.filter(title__icontains=title)
        
        notes_serializer = NoteSerializer(notes, many=True)
        return JsonResponse(notes_serializer.data, safe=False)
        # 'safe=False' for objects serialization
 
    elif request.method == 'POST':
        note_data = JSONParser().parse(request)
        note_serializer = NoteSerializer(data=note_data)
        if note_serializer.is_valid():
            note_serializer.save()
            return JsonResponse(note_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(note_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Notes.objects.all().delete()
        return JsonResponse({'message': '{} notes were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def note_detail(request, id):
    try: 
        note = Notes.objects.get(id=id) 
    except Notes.DoesNotExist: 
        return JsonResponse({'message': 'The note does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        note_serializer = NoteSerializer(note) 
        return JsonResponse(note_serializer.data) 
 
    elif request.method == 'PUT': 
        note_data = JSONParser().parse(request) 
        note_serializer = NoteSerializer(note, data=note_data) 
        if note_serializer.is_valid(): 
            note_serializer.save() 
            return JsonResponse(note_serializer.data) 
        return JsonResponse(note_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        note.delete() 
        return JsonResponse({'message': 'note was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
        
