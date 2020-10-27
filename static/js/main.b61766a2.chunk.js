(this.webpackJsonpjammming=this.webpackJsonpjammming||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(23)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(9),i=a.n(s),c=(a(15),a(2)),o=a.n(c),l=a(7),u=a(3),h=a(4),p=a(1),v=a(6),d=a(5),m=(a(17),a(18),function(e){Object(v.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={searchInput:""},n.search=n.search.bind(Object(p.a)(n)),n.searchEnter=n.searchEnter.bind(Object(p.a)(n)),n.handleSearchChange=n.handleSearchChange.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"search",value:function(){this.props.onSearch(this.state.searchInput)}},{key:"searchEnter",value:function(e){"Enter"===e.key&&this.props.onSearch(this.state.searchInput)}},{key:"handleSearchChange",value:function(e){this.setState({searchInput:e.target.value})}},{key:"render",value:function(){return r.a.createElement("div",{className:"SearchBar"},r.a.createElement("input",{placeholder:"Enter A Song, Album, or Artist",onChange:this.handleSearchChange,onKeyPress:this.searchEnter}),r.a.createElement("a",{className:"SearchButton",onClick:this.search},"Search"))}}]),a}(n.Component));a(19),a(20),a(21);var y=function(e){Object(v.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={isPlaying:!0},n.addTrack=n.addTrack.bind(Object(p.a)(n)),n.removeTrack=n.removeTrack.bind(Object(p.a)(n)),n.playPreview=n.playPreview.bind(Object(p.a)(n)),n.pausePreview=n.pausePreview.bind(Object(p.a)(n)),n.isPlayingPreview=n.isPlayingPreview.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"renderAction",value:function(e){return e?"-":"+"}},{key:"addTrack",value:function(){this.props.onAdd(this.props.trackInfo)}},{key:"removeTrack",value:function(){this.props.onRemove(this.props.trackInfo)}},{key:"isPlayingPreview",value:function(){return this.props.currentPreview===this.props.trackInfo.id&&this.state.isPlaying}},{key:"playPreview",value:function(){this.setState({isPlaying:!0}),this.props.onPreviewToggle("play",this.props.trackInfo.id)}},{key:"pausePreview",value:function(){this.setState({isPlaying:!1}),this.props.onPreviewToggle("pause")}},{key:"render",value:function(){return r.a.createElement("div",{className:"Track"},!this.isPlayingPreview()&&r.a.createElement("a",{className:"Track-play",onClick:this.playPreview}),this.isPlayingPreview()&&r.a.createElement("a",{className:"Track-pause",onClick:this.pausePreview}),r.a.createElement("div",{className:"Track-information"},r.a.createElement("h3",null,this.props.trackInfo.name),r.a.createElement("p",null,this.props.trackInfo.artist," | ",this.props.trackInfo.album)),r.a.createElement("a",{className:"Track-action",onClick:this.props.isRemoval?this.removeTrack:this.addTrack},this.props.isRemoval?"-":"+"))}}]),a}(n.Component);var k=function(e){return r.a.createElement("div",{className:"TrackList"},e.tracks.map((function(t){return r.a.createElement(y,{key:t.id,trackInfo:t,onAdd:e.onAdd,onRemove:e.onRemove,isRemoval:e.isRemoval,currentPreview:e.currentPreview,onPreviewToggle:e.onPreviewToggle})})))};var f=function(e){return r.a.createElement("div",{className:"SearchResults"},r.a.createElement("h2",null,"Results"),r.a.createElement(k,{tracks:e.searchResults,onAdd:e.onAdd,isRemoval:!1,currentPreview:e.currentPreview,onPreviewToggle:e.onPreviewToggle}))},b=(a(22),function(e){Object(v.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).handleNameChange=n.handleNameChange.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"handleNameChange",value:function(e){this.props.onNameUpdate(e.target.value)}},{key:"render",value:function(){return r.a.createElement("div",{className:"Playlist"},r.a.createElement("input",{value:this.props.name,onChange:this.handleNameChange}),r.a.createElement(k,{tracks:this.props.playlist,isRemoval:!0,onRemove:this.props.onRemove,currentPreview:this.props.currentPreview,onPreviewToggle:this.props.onPreviewToggle}),r.a.createElement("a",{className:"Playlist-save",onClick:this.props.onSave},"SAVE TO SPOTIFY"))}}]),a}(n.Component)),w="",P={getAccessToken:function(){if(w)return w;var e=window.location.href,t=e.match(/access_token=([^&]*)/),a=e.match(/expires_in=([^&]*)/);if(t&&a)return window.setTimeout((function(){return t[1]=""}),1e3*a[1]),window.history.pushState("Acces token",null),t[1];var n="https://accounts.spotify.com/authorize?client_id=".concat("6f599e1354084ea0ad97ba63ee0fd780","&response_type=token&scope=playlist-modify-public&redirect_uri=").concat("https://frogzz-dev.github.io/jammming/");window.location=n},search:function(e){return Object(l.a)(o.a.mark((function t(){var a,n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a="https://api.spotify.com/v1/search?q=".concat(e,"&type=track,artist,album"),t.prev=1,t.next=4,fetch(a,{headers:{Authorization:"Bearer "+w}});case 4:if(!(n=t.sent).ok){t.next=12;break}return t.next=8,n.json();case 8:if(!(r=t.sent).tracks.items){t.next=11;break}return t.abrupt("return",r.tracks.items.map((function(e){return{id:e.id,name:e.name,artist:e.artists[0].name,album:e.album.name,URI:e.uri}})));case 11:return t.abrupt("return",[]);case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(1),console.log(t.t0);case 17:case"end":return t.stop()}}),t,null,[[1,14]])})))()},savePlaylist:function(e,t){return Object(l.a)(o.a.mark((function a(){var n,r,s,i,c,l;return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(e&&t){a.next=2;break}return a.abrupt("return");case 2:return r={Authorization:"Bearer "+w,"Content-Type":"application/json"},a.prev=3,a.next=6,fetch("https://api.spotify.com/v1/me",{headers:r});case 6:if(!(s=a.sent).ok){a.next=25;break}return a.next=10,s.json();case 10:return i=a.sent,n=i.id,c=JSON.stringify({name:e}),a.next=15,fetch("https://api.spotify.com/v1/users/".concat(n,"/playlists"),{method:"POST",headers:r,body:c});case 15:if(!(s=a.sent).ok){a.next=25;break}return a.next=19,s.json();case 19:return i=a.sent,l=i.id,c=JSON.stringify({uris:t}),a.next=24,fetch("https://api.spotify.com/v1/playlists/".concat(l,"/tracks"),{method:"POST",headers:r,body:c});case 24:s=a.sent;case 25:a.next=30;break;case 27:a.prev=27,a.t0=a.catch(3),console.log(a.t0);case 30:case"end":return a.stop()}}),a,null,[[3,27]])})))()},getPreviewUrl:function(e){return Object(l.a)(o.a.mark((function t(){var a,n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("https://api.spotify.com/v1/tracks/".concat(e),{headers:{Authorization:"Bearer "+w}});case 3:if(!(a=t.sent).ok){t.next=9;break}return t.next=7,a.json();case 7:return n=t.sent,t.abrupt("return",n.preview_url);case 9:t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})))()}};w=P.getAccessToken();var g=P,T=function(e){Object(v.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={searchResults:[],playlistName:"New Playlist",playlistTracks:[],playingPreviewId:"",audioPlayer:new Audio("")},n.addTrack=n.addTrack.bind(Object(p.a)(n)),n.removeTrack=n.removeTrack.bind(Object(p.a)(n)),n.updatePlaylistName=n.updatePlaylistName.bind(Object(p.a)(n)),n.savePlaylist=n.savePlaylist.bind(Object(p.a)(n)),n.search=n.search.bind(Object(p.a)(n)),n.previewTrack=n.previewTrack.bind(Object(p.a)(n)),n.syncLists=n.syncLists.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"addTrack",value:function(e){this.state.playlistTracks.find((function(t){return t.id===e.id}))||(this.state.playlistTracks.push(e),this.setState({playlistTracks:this.state.playlistTracks}))}},{key:"removeTrack",value:function(e){var t=this.state.playlistTracks.findIndex((function(t){return t.id===e.id}));this.state.playlistTracks.splice(t,1),this.setState({playlistTracks:this.state.playlistTracks})}},{key:"syncLists",value:function(){var e=this;return this.state.searchResults.filter((function(t){return!e.state.playlistTracks.includes(t)}))}},{key:"updatePlaylistName",value:function(e){this.setState({playlistName:e})}},{key:"savePlaylist",value:function(){var e=this.state.playlistTracks.map((function(e){return e.URI}));g.savePlaylist(this.state.playlistName,e),this.setState({playlistName:"New Playlist",playlistTracks:[]})}},{key:"search",value:function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=7;break}return e.t0=this,e.next=4,g.search(t);case 4:e.t1=e.sent,e.t2={searchResults:e.t1},e.t0.setState.call(e.t0,e.t2);case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"previewTrack",value:function(){var e=Object(l.a)(o.a.mark((function e(t,a){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("play"!==t){e.next=9;break}if(a===this.state.playingPreviewId){e.next=6;break}return e.next=4,g.getPreviewUrl(a);case 4:(n=e.sent)?(this.setState({playingPreviewId:a}),this.state.audioPlayer.src=n):(this.setState({playingPreviewId:""}),this.state.audioPlayer.src="");case 6:this.state.audioPlayer.src!==window.location.href?this.state.audioPlayer.play():alert("No preview available"),e.next=10;break;case 9:this.state.audioPlayer.pause();case 10:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this;this.state.audioPlayer.volume=.3,this.state.audioPlayer.onended=function(){return e.setState({playingPreviewId:""})}}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Ja",r.a.createElement("span",{className:"highlight"},"mmm"),"ing"),r.a.createElement("div",{className:"App"},r.a.createElement(m,{onSearch:this.search}),r.a.createElement("div",{className:"App-playlist"},r.a.createElement(f,{searchResults:this.syncLists(),onAdd:this.addTrack,currentPreview:this.state.playingPreviewId,onPreviewToggle:this.previewTrack}),r.a.createElement(b,{name:this.state.playlistName,onNameUpdate:this.updatePlaylistName,playlist:this.state.playlistTracks,onRemove:this.removeTrack,onSave:this.savePlaylist,currentPreview:this.state.playingPreviewId,onPreviewToggle:this.previewTrack}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.b61766a2.chunk.js.map