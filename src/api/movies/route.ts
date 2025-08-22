// import { NextResponse } from 'next/server'
// import { supabase } from '@/lib/supabaseClient'

// type Movie = {
//   id: number
//   Title: string
//   Year: string
//   RunTime: string
//   Genre: string
//   Director: string
//   Actors: string
//   Description: string
//   Country: string
//   Poster: string
//   ComingSoon: boolean
// }

// export async function GET() {
//   const { data, error } = await supabase.from<Movie>('movies').select('*')

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 })
//   }

//   return NextResponse.json(data)
// }