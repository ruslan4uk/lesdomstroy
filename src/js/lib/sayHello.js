requirejs.config({
  baseUrl: "/assets/components/modxpro/js/web/",
  urlArgs:
    "v=" + document.head.querySelector('meta[name="assets-version"]').content,
  waitSeconds: 30,
  paths: {
    jquery: "lib/jquery.min",
    bootstrap: "lib/bootstrap.min",
    tether: "lib/tether.req",
    backbone: "lib/backbone.min",
    backbone_syphon: "lib/backbone.syphon.min",
    backbone_epoxy: "lib/backbone.epoxy.min",
    underscore: "lib/underscore.min",
    alertify: "lib/alertify.min",
    cookies: "lib/js.cookie.min",
    prism: "lib/prism.min",
    markitup: "lib/markitup.min",
    fancybox: "lib/jquery.fancybox.min",
    jquery_form: "lib/jquery.form.min",
    moment: "lib/moment-with-locales.min",
    numeral: "lib/numeral.min",
    sisyphus: "lib/sisyphus.min"
  },
  shim: {
    bootstrap: { deps: ["jquery"] },
    underscore: { exports: "_" },
    backbone: { deps: ["underscore", "jquery"], exports: "Backbone" },
    alertify: { exports: "Alertify" },
    cookies: { exports: "Cookies" },
    prism: { exports: "Prism" },
    fancybox: { deps: ["jquery"], exports: "Prism" },
    pdopage: { deps: ["jquery"], exports: "pdoPage" },
    app: {
      deps: [
        "jquery",
        "backbone",
        "alertify",
        "cookies",
        "moment",
        "numeral",
        "bootstrap",
        "backbone_epoxy",
        "backbone_syphon"
      ],
      exports: "App"
    }
  }
}),
  (requirejs.onError = function(e) {
    if ("timeout" !== e.requireType) throw e;
    "object" == typeof App
      ? App.Message.alert(
          "Could not load javascript. Try to reload page.",
          function() {
            document.location.reload();
          }
        )
      : (alert("Could not load javascript. Try to reload page."),
        console.log(e));
  }),
  (AppInitialized = !1);
var i;
for (i in document.links)
  document.links.hasOwnProperty(i) &&
    (document.links[i].onclick = function(e) {
      AppInitialized ||
        (void 0 !== this.href &&
          "" !== this.href &&
          "#" !== this.href &&
          !this.getAttribute("data-toggle")) ||
        ((e = e || window.event), e.preventDefault());
    });
for (i in document.forms)
  document.forms.hasOwnProperty(i) &&
    (document.forms[i].onsubmit = function(e) {
      AppInitialized || ((e = e || window.event), e.preventDefault());
    });
