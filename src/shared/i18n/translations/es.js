export default {
  all: 'Todos',
  archive: 'Archivado',
  cancel: 'Cancelar',
  dashboard: 'Dashboard',
  device: 'Dispositivo',
  empty: 'Vacío',
  error: 'Error',
  files: 'Archivos',
  file: 'Archivo',
  hoursAbrev: 'Hrs',
  never: 'Nunca',
  new: 'nuevo',
  none: 'Ninguno',
  ok: 'Ok',
  old: 'antiguo',
  profile: 'Perfil',
  save: 'Guardar',
  settings: 'Ajustes',
  status: 'Estado',
  summary: 'Resumen',
  timeChart: 'Historia',
  trend: 'Historia',
  week: 'Semana',
  worktimeVersion: 'Version Worktime %{version}',
  work: 'Trabajar',
  formFields: {
    name: 'Nombre',
    alias: 'Alias',
    shortName: 'Nombre corto',
    description: 'Descripción',
    color: 'Color',
    shortAndMemorableName: 'Nombre corto y recordable',
    workOnThisAndThat: 'Trabajar en...',
    deviceName: 'Nombre del dispositivo',
  },
  entities: {
    categories: 'Categorías',
    category: 'Categoría',
    noCategory: 'Sin categoría',
    noCategoryLower: 'sin categoría',
    newCategory: 'Nueva categoría',
    editCategory: 'Editar categoría',
    subject: 'Tema',
    subjects: 'Temas',
    subjectsSelected: 'Temas seleccionados',
    noSubjects: 'Sin temas',
    createASubjectToBegin: 'Crea un tema para empezar',
    nSubjects: '%{count} temas',
    editSubject: 'Editar tema',
    editSubjects: 'Editar temas',
    newSubject: 'Nuevo tema',
    noSessions: 'Sin sesiones',
    workSessions: 'Sesiones de trabajo',
    nSessions: {
      one: '%{count} sesión',
      other: '%{count} sesiones',
    },
    nWorkSessions: {
      zero: 'No hay sesiones',
      one: '%{count} sesión trabajada',
      other: '%{count} sesiones trabajadas',
    },
    noItems: 'Sin items',
  },
  deletion: {
    delete: 'Eliminar',
    deleteElementQuestion: 'Eliminar %{element}?',
    deleteQuestion: 'Eliminar?',
    deleteWorkSessionQuestion: 'Eliminar sesión de trabajo?',
    cantBeUndone: 'No se puede deshacer',
    discardSessionQuestion: 'Descartar esta sesión?',
    stopAndDiscard: 'Detener y descartar',
    discarded: 'Descartada',
    deleted: 'Eliminado',
    elementDeleted: '%{element} eliminado',
    workSessionDeleted: 'Sesión eliminada',
    clear: 'Remover',
  },
  workPlayer: {
    playing: 'Trabajando',
    paused: 'En pausa',
    stopped: 'Detenido',
    chooseSubject: 'Elegir tema',
    workingOnSubject: 'Trabajando en %{subject}',
    subjectPaused: '%{subject} en pausa',
    subjectStopped: '%{subject} detenido',
  },
  porting: {
    import: 'Importar',
    export: 'Exportar',
    importData: 'Importar datos',
    exportData: 'Exportar datos',
    exportYourDataToFile: 'Exportar datos a un archivo',
    exportedOn: 'Exportado en',
    selectFile: 'Elegir archivo',
    lastImported: 'Última vez importado',
    errors: {
      notJsonFile: 'No es un archivo JSON',
      noData: 'El archivo JSON no tiene datos',
    },
  },
  notif: {
    tapToGoToWorktime: 'Presiona para abrir',
    actions: {
      pause: 'Pausar',
      stop: 'Detener',
      resume: 'Continuar',
    },
  },
  times: {
    effective: 'Efectivo',
    effectiveTime: 'Tiempo efectivo',
    total: 'Total',
    totalTime: 'Tiempo total',
    perDay: 'por día',
    perWeek: 'por semana',
    worked: {
      one: 'trabajado',
      other: 'trabajados',
    },
    firstDayWorked: 'Primer día trabajado',
    lastDayWorked: 'Último día trabajado',
    lastWorked: 'Última vez trabajado',
    daysWorked: 'días trabajados',
    period: 'Periodo',
    nPauses: {
      one: '%{count} pausa',
      other: '%{count} pausas',
    },
  },
  dates: {
    today: 'Hoy',
    tomorrow: 'Mañana',
    yesterday: 'Ayer',
    thisWeek: 'Esta semana',
    thisMonth: 'Este mes',
    thisSemester: 'Este semestre',
    allTime: 'Todo el tiempo',
  },
  datePeriods: {
    day: {
      one: '%{count} día',
      other: '%{count} días',
    },
    week: {
      one: '%{count} semana',
      other: '%{count} semanas',
    },
    month: {
      one: '%{count} mes',
      other: '%{count} meses',
    },
    semester: {
      one: '%{count} semestre',
      other: '%{count} semestres',
    },
    year: {
      one: '%{count} año',
      other: '%{count} años',
    },
    infinite: 'Tiempo infinito',
    daily: 'Diario',
    weekly: 'Semanal',
  },
  dateShifts: {
    day: {
      today: 'Hoy',
      yesterday: 'Ayer',
      tomorrow: 'Mañana',
      positive: '%{count} días adelante',
      negative: '%{count} días atrás',
    },
    week: {
      today: 'Esta semana',
      yesterday: 'Semana pasada',
      tomorrow: 'Semana siguiente',
      positive: '%{count} semanas adelante',
      negative: '%{count} semanas atrás',
    },
    month: {
      today: 'Este mes',
      yesterday: 'Mes pasado',
      tomorrow: 'Mes siguiente',
      positive: '%{count} meses adelante',
      negative: '%{count} meses atrás',
    },
    semester: {
      today: 'Este semestre',
      yesterday: 'Semestre pasado',
      tomorrow: 'Siguiente semestre',
      positive: '%{count} semestres adelante',
      negative: '%{count} semestres atrás',
    },
    year: {
      today: 'Este año',
      yesterday: 'Año pasado',
      tomorrow: 'Próximo año',
      positive: '%{count} años adelante',
      negative: '%{count} años atrás',
    },
  },
  dashboardLegend: {
    effective: 'efectivo',
    paused: 'pausa',
  },
  weekView: {
    numberOfDays: 'Número de días',
  },
  iconCategories: {
    people: 'Personas',
    office: 'Oficina',
    school: 'Escuela',
    lab: 'Lab',
    charts: 'Gráficos',
    audiovisual: 'Audiovisual',
    money: 'Dinero',
    dateTime: 'Tiempo',
    medical: 'Médico',
    coding: 'Programación',
    technology: 'Tecnología',
    sports: 'Deportes',
    transport: 'Transporte',
    others: 'Otros',
  },
  timeSpans: {
    days: 'Días',
    weeks: 'Semanas',
    months: 'Meses',
    years: 'Años',
  },
  chartEmptyCases: {
    noPeriodSelected: 'Periodo de tiempo no válido',
    noTimeWorked: 'Nada',
    wrongTarget: 'Error interno: target no existe %{target}',
  },
  chartLegend: {
    total: 'total',
    effective: 'efect.',
    paused: 'pausa',
  },
};
