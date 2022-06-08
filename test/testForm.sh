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
    node src/formMain.js <<EOF
abin
2021-12-12
playing,football
9234567810
EOF
  )
  expectedPrompts="Enter name Enter dob Enter hobbies Enter ph-no"
  expected='{"name":"abin","dob":"2021-12-12","hobbies":["playing","football"],"ph-no":"9234567810"}'
  actual=$(cat 'form.json')
  assert "${prompts[@]}" "${expectedPrompts}" "All prompts"
  assert "${actual}" "${expected}" "Details in json"
}

case1
