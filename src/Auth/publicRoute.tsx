import React from 'react'

import { Outlet, Navigate } from 'react-router-dom'

import { supabase } from './supabaseClient'

const { data: { session } } = await supabase.auth.getSession()

function publicRoute() {
  if(session){
    return <Navigate to="/" />
  }
  return <Outlet />
}

export default publicRoute