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
  HStack,
  Text,
  Link,
} from 'native-base';
import {AxiosContext} from '../../context/AxiosProvider';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../../context/AuthContext';
import {AlertComponent} from '../../components/Alert';
import {useNavigation} from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function SignIn() {
  const {publicAxios} = useContext(AxiosContext);
  const {setAuthState} = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async values => {
      await publicAxios
        .post('api/auth/signin', values)
        .then((response: any) => {
          const {status, data} = response;
          if (status === 200) {
            const {message, token} = data;
            setSuccessMessage(message);
            setAuthState({
              accessToken: token,
              refreshToken: token,
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
          Sign in to continue!
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

          <Link
            _text={{
              fontSize: 'xs',
              fontWeight: '500',
              color: 'indigo.500',
            }}
            alignSelf="flex-end"
            mt="1"
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forget Password?
          </Link>

          <Button mt="4" onPress={() => formik.handleSubmit()}>
            Sign In
          </Button>

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              onPress={() => navigation.navigate('SignUp')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}