// app/api/patients/route.ts
import { NextResponse } from 'next/server';
import { addPatient, getAllPatients, searchPatients } from '@/lib/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (query) {
      const patients = await searchPatients(query);
      return NextResponse.json(patients);
    }
    
    const patients = await getAllPatients();
    return NextResponse.json(patients);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received POST body:', body); // Debug log
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phone', 'diagnosis', 'bloodType', 'ward'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate date of birth
    const dob = new Date(body.dateOfBirth);
    if (isNaN(dob.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date of birth format' },
        { status: 400 }
      );
    }
    
    // Prepare patient data
    const patientData = {
      firstName: body.firstName,
      lastName: body.lastName,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      phone: body.phone,
      diagnosis: body.diagnosis,
      bloodType: body.bloodType,
      ward: body.ward,
      image: body.image || '/default-avatar.png',
    };
    
    console.log('Adding patient with data:', patientData); // Debug log
    
    // Add the patient to database
    const newPatient = await addPatient(patientData);
    
    console.log('Patient added successfully:', newPatient); // Debug log
    
    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('POST Error details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create patient record',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}