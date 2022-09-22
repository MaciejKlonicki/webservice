import React, {Component} from 'react'
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane'

class Settings extends Component {
    render() {

    const menu = [
        {
            title: 'Profile',
            url: '/settings/profile'
        },
        {
            title: 'Language',
            url: '/settings/language'
        },
        {
            title: 'About',
            url: '/settings/about'
        }
    ];

    const dynamicOptionsForProfilePage = [
        {
            key: 'mysettings.general.username',
            label: 'Username',
            type: 'text'
        },
        {
            key: 'mysettings.general.email',
            label: 'E-mail address',
            type: 'text'
        },
        {
            key: 'mysettings.general.password',
            label: 'Password',
            type: 'password'
        },
        {
            key: 'mysettings.general.mobile',
            label: 'Phone number',
            type: 'mobile'
        }
    ];

    const leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
        // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.
     
        if (wasSaved && newSettings !== oldSettings) {
          // do something with the settings, e.g. save via ajax.
        }
      };

      const settingsChanged = (changedSettings) => {
        // this is triggered onChange of the inputs
      };

  return (
    <SettingsPane items={menu} index="/settings/profile" onPaneLeave={leavePaneHandler}>
        
    </SettingsPane>
  );
}
}

export default Settings