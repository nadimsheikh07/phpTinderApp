import React, {useContext} from 'react';
import {Box, Button} from 'native-base';
import {AuthContext} from '../../context/AuthContext';

export default function Dashboard({}: any) {
  const {authState, logout} = useContext(AuthContext);

  return (
    <Box>
      {authState.authenticated && (
        <Button
          onPress={() => logout()} // We added an onPress event which would navigate to the About screen
        >
          Logout
        </Button>
      )}
    </Box>
  );
}
