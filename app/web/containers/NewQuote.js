import '../themes/NewQuote.less';
import React from 'react';
import {Input, Radio} from 'antd';
import FormGroup from '../components/FormGroup';

const RadioGroup = Radio.Group;
const FormItems = [
  {label: '债券代码', type: Input},
  {
    label: '交易方向',
    type: RadioGroup,
    props: {
      options: [
        {label: 'Bid', value: 'Bid'},
        {label: 'Ofr', value: 'Ofr'}
      ],
      defaultValue: 'Bid'
    }
  },
  {label: '交易价格', type: Input},
  {label: '交易数量', type: Input}
];

class NewQuote extends React.Component {
  render() {
    return (
      <div className='intention-new-quote'>
        {
          FormItems.map((item, i) => {
            return <FormGroup key={i} {...item} />;
          })
        }
      </div>
    );
  }
}

export default NewQuote;
