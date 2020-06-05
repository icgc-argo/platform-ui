/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useState } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isArray from 'lodash/isArray';
import yup from 'global/utils/validations';

type DefaultDataShape = { [k: string]: any };

type FormData<T extends DefaultDataShape> = {
  key: keyof T;
  val: unknown;
};

/**
 * Supports single forms only, {} not [{},{}]
 */
interface T_FormHookInput<T extends DefaultDataShape> {
  initialFields: T;
  schema: yup.ObjectSchema<T>;
}
function useFormHook<T extends DefaultDataShape>({
  initialFields,
  schema: formSchema,
}: T_FormHookInput<T>) {
  let initErrors: DefaultDataShape = {};

  for (let [key, value] of Object.entries(initialFields)) {
    initErrors[key] = '';
  }
  const initialState = {
    errors: initErrors,
    data: initialFields,
  };

  const [form, setForm] = useState<{ errors: typeof initErrors; data: typeof initialFields }>(
    initialState,
  );

  const { errors, data } = form;

  const hasErrors = Object.values(errors).some(x => x);

  // set form data
  const setData = ({ key, val }: FormData<T>) => {
    setForm({
      ...form,
      data: { ...data, [key]: val },
    });
  };

  // set all errors
  const setErrors = ({ validationErrors }) =>
    setForm({
      ...form,
      errors: { ...errors, ...validationErrors },
    });

  // set single error
  const setError = ({ key, val }: FormData<T>) => {
    setForm({
      ...form,
      errors: { ...errors, [key]: String(val) },
    });
  };

  // validate a single field
  const validateField = async ({ key }: { key: string }) => {
    try {
      const value = await yup.reach(formSchema, key).validate(data[key]);
      setError({ key, val: '' });
    } catch (fieldError) {
      const message =
        isArray(fieldError.inner) && fieldError.inner.length > 1
          ? fieldError.inner[fieldError.inner.length - 1].message
          : fieldError.message;

      setError({ key, val: message });
    }
  };

  // validates entire form
  const validateForm = (): ReturnType<typeof formSchema.validate> =>
    new Promise(async (resolve, reject) => {
      try {
        const validData = await formSchema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        resolve(validData);
      } catch (formErrors) {
        const validationErrors = get(formErrors, 'inner', []).reduce((output, error) => {
          output[error.path] = error.message;
          return output;
        }, {});

        setErrors({ validationErrors });
        reject(validationErrors);
      }
    });

  const reset = () => {
    setForm(initialState);
  };

  const typedData: T = data;

  return {
    errors,
    setError,
    data: typedData,
    setData,
    validateField,
    validateForm,
    touched: !isEqual(initialFields, form.data),
    hasErrors,
    reset,
  };
}

export default useFormHook;
