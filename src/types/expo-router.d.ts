declare module 'expo-router' {
  import * as React from 'react';

  export type Href = string;

  // Minimal Link component typing used in this project.
  export const Link: React.ComponentType<any> & {
    Trigger: React.ComponentType<any>;
    Preview: React.ComponentType<any>;
    Menu: React.ComponentType<any> & {
      Action: React.ComponentType<any>;
    };
    MenuAction: React.ComponentType<any>;
  };

  export const Tabs: React.ComponentType<any> & { Screen: React.ComponentType<any> };
  export const Stack: React.ComponentType<any> & { Screen: React.ComponentType<any> };

  // Other exports can be added here as needed by the project.
}
