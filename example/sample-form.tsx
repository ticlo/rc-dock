import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import top100Films from './top100Films';

const SampleForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, name, age, gender, address, phone });
  };

  const handleReset = () => {
    setEmail('');
    setName('');
    setAge('');
    setGender('');
    setAddress('');
    setPhone('');
  };

  const handleRandom = () => {
    const randomEmail = `user${Math.floor(Math.random() * 1000)}@example.com`;
    const randomName = `User ${Math.floor(Math.random() * 100)}`;
    const randomAge = Math.floor(Math.random() * 50) + 18; // Age between 18 and 67
    const randomGender = Math.random() < 0.5 ? 'male' : 'female';
    const randomAddress = `123 Random St, City ${Math.floor(Math.random() * 100)}`;
    const randomPhone = `555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

    setEmail(randomEmail);
    setName(randomName);
    setAge(randomAge.toString());
    setGender(randomGender);
    setAddress(randomAddress);
    setPhone(randomPhone);
  };

  const handleSave = () => {
    console.log('Saved:', { email, name, age, gender, address, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="email-input">Email address</InputLabel>
        <Input
          id="email-input"
          aria-describedby="email-helper-text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          id="name-input"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          id="age-input"
          label="Age"
          type="number"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          id="address-input"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          id="phone-input"
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Autocomplete
          disablePortal
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleReset} style={{ marginLeft: '10px' }}>
        Reset
      </Button>
      <Button variant="outlined" color="info" onClick={handleRandom} style={{ marginLeft: '10px' }}>
        Random
      </Button>
      <Button variant="outlined" color="success" onClick={handleSave} style={{ marginLeft: '10px' }}>
        Save
      </Button>
    </form>
  );
};

export default SampleForm;