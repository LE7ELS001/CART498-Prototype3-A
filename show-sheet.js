export function mountShowSheet(stage, initiallyExpanded, onChange) {
  const sheet = stage.querySelector('.live-sheet');
  const grip = sheet.querySelector('.sheet-grip');
  const cards = sheet.querySelector('.sheet-cards');
  const browse = stage.closest('.audience-browse');
  const map = browse.querySelector('#map');
  const mapCard = browse.querySelector('.map-dock');
  const showList = mapCard.querySelector('.list-open');
  const showMap = sheet.querySelector('.map-return');
  let expanded = initiallyExpanded;
  let gesture;
  let suppressClick = false;

  function setExpanded(next, notify = true) {
    expanded = next;
    browse.dataset.expanded = String(next);
    grip.setAttribute('aria-expanded', String(next));
    grip.setAttribute('aria-label','Expand live shows');
    cards.inert = !next;
    cards.setAttribute('aria-hidden',String(!next));
    map.inert = mapCard.inert = next;
    if (!next) cards.scrollTop = 0;
    if (notify) onChange(next);
  }

  grip.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    gesture = {id:event.pointerId, start:event.clientY, height:sheet.getBoundingClientRect().height};
    grip.setPointerCapture(event.pointerId);
  });

  grip.addEventListener('pointermove', event => {
    if (gesture?.id !== event.pointerId) return;
    const dy = gesture.start - event.clientY;
    if (!gesture.dragging && Math.abs(dy) < 5) return;
    gesture.dragging = true;
    suppressClick = true;
    browse.dataset.dragging = 'true';
    cards.inert = true;
    cards.setAttribute('aria-hidden','true');
    map.inert = mapCard.inert = true;
    const collapsed = grip.offsetHeight;
    const height = Math.max(collapsed, Math.min(stage.clientHeight, gesture.height + dy));
    sheet.style.height = height + 'px';
  });

  function release(event) {
    if (gesture?.id !== event.pointerId) return;
    const {start, dragging} = gesture;
    gesture = undefined;
    if (!dragging) return;
    const threshold = Math.max(42, Math.min(110, stage.clientHeight * .23));
    const dy = start - event.clientY;
    delete browse.dataset.dragging;
    setExpanded(event.type === 'pointerup' && Math.abs(dy) >= threshold ? dy > 0 : expanded);
    // Commit the current height before CSS animates the rest of the way.
    void sheet.offsetHeight;
    sheet.style.removeProperty('height');
  }

  grip.addEventListener('pointerup', release);
  grip.addEventListener('pointercancel', release);
  grip.addEventListener('lostpointercapture', release);
  grip.addEventListener('click', event => {
    if (suppressClick && event.detail) {
      suppressClick = false;
      return;
    }
    setExpanded(true);
  });
  showList.addEventListener('click',()=>{
    setExpanded(true);
    showMap.focus();
  });
  showMap.addEventListener('click',()=>{
    setExpanded(false);
    (browse.dataset.selected ? showList : grip).focus();
  });
  setExpanded(expanded, false);
}
