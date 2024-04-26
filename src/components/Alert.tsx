/* eslint-disable react/react-in-jsx-scope */
import {
  Alert,
  Center,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Box,
  Text,
} from 'native-base';

export function AlertComponent({title, type, message, onClose}: any) {
  return (
    <Center>
      <Alert status={type} colorScheme={type}>
        <VStack space={2} flexShrink={1} w="100%">
          {title && (
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: 'coolGray.600',
                }}
                onPress={onClose}
              />
            </HStack>
          )}
          {message && (
            <Box
              pl="6"
              _text={{
                color: 'coolGray.600',
              }}>
              {message}
            </Box>
          )}
        </VStack>
      </Alert>
    </Center>
  );
}
