import * as React from 'react';
import styled from 'styled-components/native';
import {
  AnimatedScreenWrapper,
  Button,
  Header,
  ScreenContentContainer,
  Text,
  TextInput,
} from '../../components';
import {colors} from '../../theme';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const SignupSchema = Yup.object().shape({
  id: Yup.string()
    .min(2, 'Demasiado corto')
    .max(50, 'Demasiado largo')
    .required('Campo requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .max(50)
    .required('Campo requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Campo requerido'),
});

const PaddingContainer = styled.View`
  padding: 20px;
`;

const initialValues = {
  id: '',
  password: '',
  confirmPassword: '',
};

const ErrorContainer = styled.View`
  padding-top: 5px;
`;

function Register() {
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const onSubmit = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <AnimatedScreenWrapper>
      <Header showBackButton centered />
      <ScreenContentContainer>
        <Formik
          validationSchema={SignupSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <PaddingContainer>
                <TextInput
                  placeholder="Usuario"
                  onChangeText={handleChange('id')}
                  onBlur={handleBlur('id')}
                  value={values.id}
                  maxLength={50}
                />
                {errors.id && touched.id && (
                  <ErrorContainer>
                    <Text color={colors.secondary} type="mini">
                      {errors.id}
                    </Text>
                  </ErrorContainer>
                )}
              </PaddingContainer>
              <PaddingContainer>
                <TextInput
                  placeholder={i18n.t('password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  maxLength={50}
                  secureTextEntry
                />
                {errors.password && touched.password && (
                  <ErrorContainer>
                    <Text color={colors.secondary} type="mini">
                      {errors.password}
                    </Text>
                  </ErrorContainer>
                )}
              </PaddingContainer>
              <PaddingContainer>
                <TextInput
                  onChangeText={handleChange('confirmPassword')}
                  placeholder={i18n.t('register.confirm')}
                  value={values.confirmPassword}
                  secureTextEntry
                  onBlur={handleBlur('confirmPassword')}
                  maxLength={50}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <ErrorContainer>
                    <Text color={colors.secondary} type="mini">
                      {errors.confirmPassword}
                    </Text>
                  </ErrorContainer>
                )}
              </PaddingContainer>
              <PaddingContainer>
                <Button
                  textColor={colors.white}
                  enabled={isValid}
                  height={50}
                  backgroundColor={colors.secondary}
                  fullWidth
                  title={i18n.t('common.save')}
                  onPress={handleSubmit}
                />
              </PaddingContainer>
            </>
          )}
        </Formik>
      </ScreenContentContainer>
    </AnimatedScreenWrapper>
  );
}

export default React.memo(Register);
