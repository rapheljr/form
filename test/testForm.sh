#!/bin/bash

function assert() {
  local actual=$1
  local expected=$2
  local description=$3

  echo ${actual} >/tmp/_actual.txt
  echo ${expected} >/tmp/_expected.txt

  diff /tmp/_actual.txt /tmp/_expected.txt >/dev/null
  code=$?
  status='Failed'
  if [ ${code} -eq 0 ]; then
    status='Passed'
  fi
  echo "${status} - ${description}"
}

function case1() {
  prompts=$(
    node ./fillForm.js <<EOF
abine
1999-09-02
cricket,football
9876543210
kerala
india
EOF
  )
  expectedPrompts="Please enter your name: Please enter your DOB: Please enter your hobbies: Please enter your phone number: Please enter your address line 1: Please enter your address line 2: Thank you"
  expected='{"name":"abine","DOB":"1999-09-02","hobbies":["cricket","football"],"phone-number":"9876543210","address":"kerala\nindia"}'
  actual=$(cat 'form.json')
  assert "${prompts[@]}" "${expectedPrompts}" "All prompts"
  assert "${actual}" "${expected}" "Details in json"
}

case1
