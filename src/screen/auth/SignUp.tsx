import React, {useContext} from 'react';
import {
  Box,
  Button,
  Center,
  VStack,
  FormControl,
  Heading,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
import {AxiosContext} from '../../context/AxiosProvider';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../../context/AuthContext';
import {AlertComponent} from '../../components/Alert';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function SignUp() {
  const {publicAxios} = useContext(AxiosContext);
  const {setAuthState} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      await publicAxios
        .post('api/auth/signup', values)
        .then((response: any) => {
          const {status, data} = response;
          if (status === 200) {
            const {message, accessToken} = data;
            setSuccessMessage(message);
            setAuthState({
              accessToken: accessToken,
              refreshToken: accessToken,
              authenticated: true,
            });
          }
        })
        .catch((error: any) => {
          const {message} = error;
          setErrorMessage(message);
        });
    },
  });

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="100%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>

        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign Up to continue!
        </Heading>

        {errorMessage && (
          <AlertComponent
            type="error"
            title={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}

        {successMessage && (
          <AlertComponent
            type="success"
            title={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        )}

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={formik.errors.email}>
            <Stack mx="4">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                type="text"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                placeholder="email"
              />

              {formik.errors.email && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.email}
                </FormControl.ErrorMessage>
              )}
            </Stack>
          </FormControl>

          <FormControl isRequired isInvalid={formik.errors.password}>
            <Stack mx="4">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                placeholder="password"
              />

              {formik.errors.password && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  {formik.errors.password}
                </FormControl.ErrorMessage>
              )}
            </Stack>
          </FormControl>

          <Button mt="4" onPress={() => formik.handleSubmit()}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}