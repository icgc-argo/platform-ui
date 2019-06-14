import React from 'react';
import { storiesOf } from '@storybook/react';
import MultiSelect, { Option } from '.';
import { action } from '@storybook/addon-actions';

function WithState({ children }) {
  const [value, setValue] = React.useState([]);

  return React.cloneElement(children, {
    value,
    onChange: event => {
      action('value change')(event);
      setValue(event.target.value);
    },
  });
}

const MultiSelectStories = storiesOf(`${__dirname}`, module)
  .add('Basic', () => (
    <WithState>
      <MultiSelect
        value="[parent state]"
        onChange={() => '[parent func]'}
        placeholder="Add one or more..."
      >
        <Option value="Australia">Australia</Option>
        <Option value="Cambodia">Cambodia</Option>
        <Option value="Cameroon">Cameroon</Option>
        <Option value="Canada">Canada</Option>
        <Option value="Afghanistan">Afghanistan</Option>
        <Option value="Albania">Albania</Option>
        <Option value="Algeria">Algeria</Option>
        <Option value="Andorra">Andorra</Option>
        <Option value="Angola">Angola</Option>
        <Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
        <Option value="Argentina">Argentina</Option>
        <Option value="Armenia">Armenia</Option>
        <Option value="Austria">Austria</Option>
        <Option value="Azerbaijan">Azerbaijan</Option>
        <Option value="Bahamas">Bahamas</Option>
        <Option value="Bahrain">Bahrain</Option>
        <Option value="Bangladesh">Bangladesh</Option>
        <Option value="Barbados">Barbados</Option>
        <Option value="Belarus">Belarus</Option>
      </MultiSelect>
    </WithState>
  ))
  .add('Allow new value', () => (
    <WithState>
      <MultiSelect
        value="[parent state]"
        onChange={() => '[parent func]'}
        placeholder="Add one or more..."
        allowNew
      >
        <Option value="Australia">Australia</Option>
        <Option value="Cambodia">Cambodia</Option>
        <Option value="Cameroon">Cameroon</Option>
        <Option value="Canada">Canada</Option>
        <Option value="Afghanistan">Afghanistan</Option>
        <Option value="Albania">Albania</Option>
        <Option value="Algeria">Algeria</Option>
        <Option value="Andorra">Andorra</Option>
        <Option value="Angola">Angola</Option>
      </MultiSelect>
    </WithState>
  ));
export default MultiSelectStories;
