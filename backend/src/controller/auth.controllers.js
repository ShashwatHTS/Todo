require('dotenv').config()

const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/books.db')

const supabase = createClient(supabaseUrl, supabaseKey)


exports.getData = async (req, res) => {
  const { data, error } = await supabase
    .from('todo')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }
  // console.log(data);
  res.send(data)
}



exports.getRegistered = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const { data, error } = await supabase.auth.signUp(req.body)
    // console.log("w => ", data);
    if (data?.user) {
      console.log("data=>", data.user.id)

      const userResponse = await supabase.from('register').insert({ auth_id: data.user.id, email, username }).select();

      if (userResponse) {
        console.log("userResponse => ", userResponse)
        res.send(userResponse.data)

      } else {
        console.log("error")
      }
    } else {
      console.log(error)
      res.send("User already Registered")
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.logInUser = async (req, res) => {
  const { username, email, password } = req.body;

  //login user using supabase
  const { data, error } = await supabase.auth.signInWithPassword({ username, email, password });
  // console.log(data)
  console.log("w => ", data);
  if (data?.user) {
    console.log("data=>", data.user.id)
    const userResponse = await supabase
      .from('register')
      .update({ active: true })
      .eq('auth_id', data.user.id)
      .select();

    if (userResponse) {
      console.log("userResponse => ", userResponse)
      res.send(userResponse)
    }
  } else {
    console.log(error)
    res.send("invalid name/email or password")
  }

}

exports.logOutUser = async (req, res) => {
  const userResponse = await supabase
    .from('register')
    .update({ active: false })
    .eq('auth_id', data.user.id)
    .select();

  console.log(userResponse)
  if (userResponse) {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log("something went wrong")
      res.send("something went wrong")
    }
    res.send("successfully logout")
  }
}



