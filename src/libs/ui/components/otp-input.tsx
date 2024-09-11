import { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import { CodeField, Cursor, useClearByFocusCell } from 'react-native-confirmation-code-field';

interface OtpInputProps {
  onChangeText?: (value: string) => void;
  onBlur?: () => void;
}

const OtpInput = ({ onBlur, onChangeText }: OtpInputProps) => {
  const [value, setValue] = useState('');
  const [codeFieldProps, getCellOnLayout] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View className="flex-1 p-5 items-center justify-center w-full flex-row flex">
      <CodeField
        {...codeFieldProps}
        value={value}
        onChangeText={(value) => {
          setValue(value);
          onChangeText && onChangeText(value);
        }}
        onBlur={onBlur}
        cellCount={6}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        rootStyle={{
          marginTop: 20,
          justifyContent: 'center',
          gap: 30,
          width: '90%',
          margin: 'auto',
        }}
        renderCell={({ index, symbol, isFocused }) => (
          <Fragment key={index}>
            <Text
              key={`value-${index}`}
              onLayout={getCellOnLayout(index)}
              className="w-8 h-10 rounded-full text-2xl bg-background-third border border-gray-200 flex justify-center items-center text-center"
              style={{ lineHeight: 60 }}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </Fragment>
        )}
      />
    </View>
  );
};

export default OtpInput;
