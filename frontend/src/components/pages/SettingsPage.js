/*
 *  SettingsPage.js
 *  The page that renders on the /settings route
 *  Renders the settings page of the logged in user 
 *  accessed by clicking the gear icon in the profile route & page
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import { React } from 'react'
import SettingsForm from '../SettingsForm';

function SettingsPage() {
  return (
    <div>
      <SettingsForm/>
    </div>
  )
}

export default SettingsPage
