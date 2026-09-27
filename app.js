(function () {
  var form = document.getElementById("lead-form");
  var msg = document.getElementById("form-msg");
  var cfg = window.QF_CONFIG || {};

  function show(text, kind) {
    msg.textContent = text;
    msg.className = "form-msg " + (kind || "");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    if (data.website) return; // honeypot: bots fill hidden fields
    if (!data.name || !data.email || data.email.indexOf("@") < 1) {
      show("Please add your name and a valid email.", "err");
      return;
    }
    delete data.website;
    var button = form.querySelector("button");
    button.disabled = true;

    if (!cfg.saveLeads) {
      form.reset();
      show("Thanks! (Demo mode: in your version, this lands in your database and you get an email.)", "ok");
      button.disabled = false;
      return;
    }

    try {
      var res = await fetch(cfg.supabaseUrl + "/rest/v1/" + cfg.table, {
        method: "POST",
        headers: {
          "apikey": cfg.supabaseKey,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      show("Thanks! We'll reply within one business day.", "ok");
    } catch (err) {
      show("Something went wrong. Please email us instead.", "err");
    } finally {
      button.disabled = false;
    }
  });
})();
