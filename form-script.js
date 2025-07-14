const dbName = "EMP-DB";
const relName = "EmpData";
const baseURL = "http://api.login2explore.com:5577";
const token = "90934998|-31949251309011571|90959214";

function disableAllFields() {
  $("#empName, #empSalary, #empHra, #empDa, #empDeduction").prop("disabled", true);
}

function enableAllFields() {
  $("#empName, #empSalary, #empHra, #empDa, #empDeduction").prop("disabled", false);
}

function resetForm() {
  $("#empForm")[0].reset();
  disableAllFields();
  $("#saveBtn, #changeBtn, #resetBtn").prop("disabled", true);
  $("#empId").prop("disabled", false).focus();
}

function getEmp() {
  let empId = $("#empId").val();
  if (!empId) return;

  const req = {
    token,
    cmd: "GET",
    dbName,
    rel: relName,
    jsonStr: { id: empId }
  };

  $.post(`${baseURL}/api/irl`, JSON.stringify(req), function (res) {
    if (!res.data) {
      enableAllFields();
      $("#empId").prop("disabled", false);
      $("#saveBtn, #resetBtn").prop("disabled", false);
    } else {
      let data = res.data.record;
      $("#empId").prop("disabled", true);
      enableAllFields();
      $("#empName").val(data.name);
      $("#empSalary").val(data.salary);
      $("#empHra").val(data.hra);
      $("#empDa").val(data.da);
      $("#empDeduction").val(data.deduction);
      $("#changeBtn, #resetBtn").prop("disabled", false);
    }
  });
}

function validateFields() {
  const fields = ["#empId", "#empName", "#empSalary", "#empHra", "#empDa", "#empDeduction"];
  for (let field of fields) {
    if (!$(field).val()) {
      alert("All fields are required.");
      return false;
    }
  }
  return true;
}

function saveData() {
  if (!validateFields()) return;

  const req = {
    token,
    cmd: "PUT",
    dbName,
    rel: relName,
    jsonStr: {
      id: $("#empId").val(),
      name: $("#empName").val(),
      salary: $("#empSalary").val(),
      hra: $("#empHra").val(),
      da: $("#empDa").val(),
      deduction: $("#empDeduction").val()
    }
  };

  $.post(`${baseURL}/api/iml`, JSON.stringify(req), function () {
    alert("Record saved.");
    resetForm();
  });
}

function changeData() {
  if (!validateFields()) return;

  const req = {
    token,
    cmd: "UPDATE",
    dbName,
    rel: relName,
    jsonStr: {
      id: $("#empId").val(),
      name: $("#empName").val(),
      salary: $("#empSalary").val(),
      hra: $("#empHra").val(),
      da: $("#empDa").val(),
      deduction: $("#empDeduction").val()
    }
  };

  $.post(`${baseURL}/api/iml`, JSON.stringify(req), function () {
    alert("Record updated.");
    resetForm();
  });
}
